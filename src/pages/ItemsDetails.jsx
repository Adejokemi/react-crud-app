import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const fetchItem = async (id) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return res.json();
};

const deleteItem = async (id) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete item");
  return id;
};

function ItemDetails() {
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
    mutationFn: () => deleteItem(id),
    onSuccess: (deletedId) => {
      queryClient.setQueryData(
        ["items"],
        (oldItems) => oldItems?.filter((i) => i.id !== deletedId) || []
      );
      toast.success("Item deleted successfully!");
      setTimeout(() => navigate("/"), 3000);
    },
    onError: () => toast.error("Failed to delete item."),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading item</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{item.title}</h1>
      <p className="mb-4">{item.body}</p>
      <div className="flex gap-4">
        <Link
          to={`/edit/${id}`}
          className="border-blue-500 border-2 font-medium text-blue-700 px-8 py-2 rounded-md hover:bg-blue-600 hover:text-white"
        >
          Edit
        </Link>
        <button
          onClick={() => mutation.mutate()}
          className="bg-red-500 text-white px-6 py-2 font-medium rounded-md hover:border-red-600 hover:bg-transparent hover:border-2 hover:text-red-600"
        >
          {mutation.isLoading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}

export default ItemDetails;
