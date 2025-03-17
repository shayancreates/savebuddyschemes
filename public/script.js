document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch("/api/schemes");
    const schemes = await response.json();

    const schemesList = document.getElementById("schemesList");
    schemes.forEach(scheme => {
        let div = document.createElement("div");
        div.classList.add("p-4", "border", "rounded", "bg-gray-50");

        div.innerHTML = `
            <h2 class="text-xl font-bold">${scheme.name}</h2>
            <p>${scheme.description}</p>
            <p><strong>Min Balance:</strong> ${scheme.minBalanceRequired}</p>
            <button class="apply-btn bg-blue-500 text-white px-4 py-2 rounded mt-2" data-id="${scheme._id}">
                Apply
            </button>
        `;

        schemesList.appendChild(div);
    });

    document.querySelectorAll(".apply-btn").forEach(btn => {
        btn.addEventListener("click", async () => {
            const userId = prompt("Enter your User ID:");
            const schemeId = btn.dataset.id;

            const res = await fetch("/api/schemes/apply", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, schemeId })
            });

            const data = await res.json();
            alert(data.message);
        });
    });
});
