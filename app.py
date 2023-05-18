from flask import Flask, render_template, jsonify, request, json
app = Flask(__name__)

from pymongo import MongoClient

import certifi
ca = certifi.where()

client = MongoClient('mongodb+srv://sparta:test@sparta.mw5zmbb.mongodb.net/?retryWrites=true&w=majority', tlsCAFile=ca)

db = client.dbsparta

@app.route('/')
def home():
    getInfo = list(db.info.find({}, {'_id':False}))
    return render_template('index.html', info=getInfo)

@app.route('/sendEmail')
def contact():
    return render_template('sendEmail.html')

@app.route('/comment')
def comment():
    return render_template('comment.html')

@app.route('/application')
def application():
    return render_template('application.html')

# comment
@app.route("/guestbook", methods=["POST"])
def guestbook_post():
    name_receive = request.form['name_give']
    comment_receive = request.form['comment_give']
    group_receive = request.form['group_give']
    import string, random
    length = 8
    string_pool =  string.digits
    num = ""
    for i in range(length) :
        num += random.choice(string_pool)
    doc={
        'name':name_receive,
        'comment':comment_receive,
        'group':group_receive,
        '_id':num
    }
    db.fanm.insert_one(doc)

    return jsonify({'msg': '응원 저장 완료'})

@app.route('/guestbook', methods=['GET'])
def guestbook_get():
    all_fan =list(db.fanm.find({}))
    return jsonify({'result': all_fan})

@app.route("/guestbook/delete", methods=["POST"])
def guestbook_delete():
    # delete_list(id) 에서 id라는 변수를 num_give라는 변수로 보냄 >> 받은 num_give를 num_receive라는 변수에 넣어줌
    num_receive = request.form['num_give']
    db.fanm.delete_one({'_id': num_receive})
    return jsonify({'msg': '삭제 완료!'})



@app.route('/detail')
def detail():
    query = request.args.get('query')
    getInfo = list(db.info.find({'name':query}, {'_id':False}))

    return render_template('detail.html', info=getInfo)


if __name__ == '__main__':
    app.run('0.0.0.0', port=5501, debug=True)