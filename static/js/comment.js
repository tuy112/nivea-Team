$(document).ready(function () {
  show_comment();
});
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
  fetch("/guestbook")
    .then((res) => res.json())
    .then((data) => {
      let rows = data["result"];
      $("#comment-list").empty();
      rows.forEach((a) => {
        let group = a["group"];
        let name = a["name"];
        let comment = a["comment"];
        let temp_html = ` <div class="card">
        <div class="card-body">
          <blockquote class="blockquote mb-0">
            <p>${comment}</p>
            <footer class="blockquote-footer">${group}조 ${name}</footer>

          </blockquote>
          <div class="delete_button_box">
              <button id="delete_button" type="button" class="btn btn-danger">
                삭제
              </button>
            </div>
        </div>
      </div>`;
        $("#comment-list").append(temp_html);
      });
    });
}
