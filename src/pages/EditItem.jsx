import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const fetchItem = async (id) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return res.json();
};

const updateItem = async ({ id, title, body }) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify({ id, title, body, userId: 1 }),
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
};

function EditItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: item,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["item", id],
    queryFn: () => fetchItem(id),
  });

  const mutation = useMutation({
    mutationFn: updateItem,
    onSuccess: (updatedItem) => {
      queryClient.setQueryData(["item", id], updatedItem);
      queryClient.invalidateQueries(["items"]);
      toast.success("Item updated successfully!");
      setTimeout(() => navigate("/"), 3000);
    },
    onError: () => toast.error("Failed to update item."),
  });

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setBody(item.body);
    }
  }, [item]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading item</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Item</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutation.mutate({ id, title, body });
        }}
      >
        <input
          className="block w-full mb-4 p-2 border"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          className="block w-full mb-4 p-2 border"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Body"
        />
        <button
          type="submit"
          className="hover:bg-blue-600 border-2 hover:text-white text-blue-600 rounded-md px-8 py-2 text-lg font-medium"
        >
          {mutation.isLoading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}

export default EditItem;
