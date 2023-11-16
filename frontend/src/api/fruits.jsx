export async function fetchFruits() {
  const response = await fetch("http://localhost:8080/fruits");
  return response.json();
}

export async function deleteFruit(id) {
  const response = await fetch(`http://localhost:8080/delete-fruit/${id}`, {
    method: "DELETE",
  });
  return response;
}

export async function createFruit(newFruit) {
  const response = await fetch("http://localhost:8080/add-fruit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newFruit),
  });
  return response;
}

export async function updateFruit(id, updatedFruit) {
  const response = await fetch(`http://localhost:8080/edit-fruit/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedFruit),
  });

  return response;
}

export async function fetchFruit(id) {
  const response = await fetch(`http://localhost:8080/fruit/${id}`);
  return response.json();
}
