export async function fetchFruits() {
    const response = await fetch('http://localhost:8080/fruits')
    return response.json()
}

export async function deleteFruit(id) {
    const response = await fetch(`http://localhost:8080/delete-fruit/${id}`,{
        method: "DELETE"
    });
    console.log(response)
    return response
}