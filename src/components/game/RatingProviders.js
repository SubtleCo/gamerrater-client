export const createRating = rating => {
    return fetch(`http://localhost:8000/ratings`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(rating)
    })
        .then(res => res.json())
}