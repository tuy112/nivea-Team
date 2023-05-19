$(document).ready(function () {
  set_temp();
  show_comment();
});
function set_temp() {
  fetch("http://spartacodingclub.shop/sparta_api/weather/seoul")
    .then((res) => res.json())
    .then((data) => {
      let temp = data["temp"];
      $("#temp").text(temp);
    });
}
function save_comment() {
  let name = $("#name").val();
  let comment = $("#comment").val();
  let group = $("#group").val();
  let formData = new FormData();
  formData.append("name_give", name);
  formData.append("comment_give", comment);
  formData.append("group_give", group);

  fetch("/guestbook", { method: "POST", body: formData })
    .then((res) => res.json())
    .then((data) => {
      //console.log(data)
      alert(data["msg"]);
      window.location.reload();
    });
}
function show_comment() {
  $.ajax({
    type: "GET",
    url: "/guestbook",
    data: {},
    success: function (response) {
      // app.py #보여주기의 key 값인 names 를 함수 변수 response에 넣어주고 rows에 넣어줌
      let rows = response["result"];
      $("#comment-list").empty();
      console.log(rows);
      // i를 0으로 지정 rows.length = rows 의 길이만큼돌리고, i++ = i에 1추가, for = 이걸 반복
      for (let i = 0; i < rows.length; i++) {
        let name = rows[i]["name"];
        let id = rows[i]["_id"];
        let comment = rows[i]["comment"];
        let group = rows[i]["group"];
        // console.log(rows)
        // ${name} = rows[i]['name'] , ${id} = rows[i]['_id']
        let temp_html = `
        <div class="mycard" >
          <div class="my-card-body">
            <div class="blockquote mb-0">
              <p>${comment}</p>
              <footer class="blockquote-footer">${group}조 ${name}</footer>

            </div>
            <div class="delete_button_box">
                <button onclick="delete_list(${id})" id="delete_button" type="button" class="btn btn-danger">
                  삭제
                </button>
              </div>
          </div>
        </div>`;

        $("#comment-list").append(temp_html);
      }
    },
  });
}
function delete_list(id) {
  $.ajax({
    type: "POST",
    url: "/guestbook/delete",
    data: { num_give: id }, // id라는 매개변수를 num_give라는 변수에 넣어줌 , num_give 는 다른곳에서 사용 가능.
    success: function (response) {
      // 성공하면 response에 넣어줌.
      alert(response["msg"]);
      window.location.reload();
    },
  });
}
