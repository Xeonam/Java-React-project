export async function fetchSuppliers() {
    const response = await fetch('http://localhost:8080/suppliers')
    return response.json()
}

export async function deleteSupplier(id) {
    const response = await fetch(`http://localhost:8080/delete-supplier/${id}`,{
        method: "DELETE"
    });
    return response
}