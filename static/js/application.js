document.querySelector("#login-form").addEventListener("submit", function (e) {
    if (document.querySelector("#name").value == "") {
      // id 라는 id 를 선택하고 해당 input이 공백일 경우
      e.preventDefault(); // 폼 전송을 막음
      alert("⛔ 이름을 입력해주세요"); // '아이디를 입력해주세요' 라는 경고창을 띄움
    } else if (document.querySelector("#email").value == "") {
      // password 라는 id 를 선택하고 해당 input이 공백일 경우
      e.preventDefault(); // 폼 전송을 막음
      alert("⛔ 메일을 입력해주세요!"); // '비밀번호를 입력해주세요' 라는 경고창을 띄움
    } else if (document.querySelector("#github").value == "") {
      // password 라는 id 를 선택하고 해당 input이 공백일 경우
      e.preventDefault(); // 폼 전송을 막음
      alert("⛔ github 주소를 입력해주세요!"); // '비밀번호를 입력해주세요' 라는 경고창을 띄움
    } else if (document.querySelector("#str").value == "") {
      // password 라는 id 를 선택하고 해당 input이 공백일 경우
      e.preventDefault(); // 폼 전송을 막음
      alert("⛔ 장점을 입력해주세요!"); // '비밀번호를 입력해주세요' 라는 경고창을 띄움
    } 
    else {
        const formData = new FormData(e.target.value);
        console.log(formData);
        formData.append("service_id", "service_s6l8dom");
        formData.append("template_id", "template_qucfqur");
        formData.append("user_id", "FhBDdklrwtHsn51F2");
        let params = {
            user_id: "FhBDdklrwtHsn51F2",
            service_id: "service_s6l8dom",
            template_id: "template_qucfqur",
            template_params: {
            name: document.querySelector('input[id="name"]').value,
            email: document.querySelector('input[id="email"]').value,
            url: document.querySelector('input[id="github"]').value,
            str: document.querySelector('input[id="str"]').value,
            },
        };
    
        let headers = {
            "Content-type": "application/json",
        };
    
        let options = {
            method: "POST",
            headers: headers,
            body: JSON.stringify(params),
        };
    
        fetch("https://api.emailjs.com/api/v1.0/email/send", options)
            .then((httpResponse) => {
            if (httpResponse.ok) {
                const admit = `   제출 완료🚨
                승인을 기다리세요···  `;
                alert(admit);
            } else {
                return httpResponse.text().then((text) => Promise.reject(text));
            }
            })
            .catch((error) => {
            console.log("Oops... " + error);
            });
    }
    
  });
  