const uploadInput = document.getElementById("uploadInput");
const uploadArea = document.querySelector(".upload-box");

uploadInput.addEventListener("change", async (event) => {

    const file = event.target.files[0];

    if (!file) return;

    uploadArea.innerHTML = `
        <p style="margin-top:20px;">Processing image...</p>
    `;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {

        try {

            const response = await fetch("/api/removebg", {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    image: reader.result.split(",")[1]
                })
            });

            if (!response.ok) {
                throw new Error("Failed");
            }

            const blob = await response.blob();

            const imageUrl = URL.createObjectURL(blob);

            uploadArea.innerHTML = "";

            uploadArea.style.textAlign = "center";

            const resultImage = document.createElement("img");

            resultImage.src = imageUrl;

            resultImage.style.maxWidth = "300px";
            resultImage.style.borderRadius = "20px";
            resultImage.style.marginTop = "20px";
            resultImage.style.display = "block";
            resultImage.style.marginLeft = "auto";
            resultImage.style.marginRight = "auto";

            uploadArea.appendChild(resultImage);

            const downloadBtn = document.createElement("a");

            downloadBtn.href = imageUrl;

            downloadBtn.download = "clearbg.png";

            downloadBtn.classList.add("download-btn");

            downloadBtn.innerText = "Download Image";

            downloadBtn.style.display = "inline-block";
            downloadBtn.style.marginTop = "20px";

            uploadArea.appendChild(downloadBtn);

        } catch (error) {

            uploadArea.innerHTML = `
                <p style="color:red">
                    Error removing background
                </p>
            `;

            console.log(error);
        }
    };
});