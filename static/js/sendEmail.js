$(document).ready(function () {
  emailjs.init("FhBDdklrwtHsn51F2");

  $("#contact-form").on("submit", function (event) {
    event.preventDefault();
    console.log("a");
    const formData = new FormData(this);
    formData.append("service_id", "service_s6l8dom");
    formData.append("template_id", "template_vdqsj88");
    formData.append("user_id", "FhBDdklrwtHsn51F2");

    $.ajax("https://api.emailjs.com/api/v1.0/email/send-form", {
      type: "POST",
      data: formData,
      contentType: false,
      processData: false,
    })
      .done(function () {
        let tagArea = document.getElementById("tagArea");
        let newAlertHtml = document.createElement("p");

        newAlertHtml.setAttribute("class", "alert alert-success");
        newAlertHtml.innerHTML = "이메일 전송 성공!";

        tagArea.appendChild(newAlertHtml);

        setTimeout(() => {
          tagArea.removeChild(newAlertHtml);

          document.getElementById("contact-form").reset();
        }, 2000);
      })
      .fail(function (error) {
        alert("Oops... " + JSON.stringify(error));
      });
  });
});
