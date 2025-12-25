import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import api from "../api/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../auth/AuthContext";

/* ================= SCHEMA ================= */

const schema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1),
  dueDate: z.string(), // datetime-local string
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]),
  assignedToId: z.string().nullable(),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  onClose: () => void;
  task?: any; // present only in edit mode
}

/* ================= FETCH USERS ================= */

const fetchUsers = async () => {
  const res = await api.get("/auth/users");
  return res.data.users;
};

/* ================= COMPONENT ================= */

const CreateTaskModal = ({ onClose, task }: Props) => {
  const isEdit = Boolean(task);
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const { register, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: isEdit
      ? {
          title: task.title,
          description: task.description,
          dueDate: task.dueDate?.slice(0, 16),
          priority: task.priority,
          assignedToId: task.assignedToId ?? null,
        }
      : {
          title: "",
          description: "",
          dueDate: "",
          priority: "LOW",
          assignedToId: user?.id ?? null,
        },
  });

  const onSubmit = async (values: FormValues) => {
    const payload = {
      ...values,
      dueDate: new Date(values.dueDate).toISOString(),
    };

    try {
      if (isEdit) {
        await api.patch(`/tasks/${task.id}`, payload);
      } else {
        await api.post("/tasks", payload);
      }

      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      onClose();
    } catch (err) {
      console.error("Task save failed", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-gray-800 p-6 rounded w-full max-w-md space-y-3
                   text-gray-900 dark:text-gray-100"
      >
        <h2 className="text-xl font-semibold">
          {isEdit ? "Edit Task" : "Create Task"}
        </h2>

        {/* TITLE */}
        <input
          {...register("title")}
          placeholder="Title"
          className="w-full border p-2 rounded bg-white text-black"
        />

        {/* DESCRIPTION */}
        <textarea
          {...register("description")}
          placeholder="Description"
          className="w-full border p-2 rounded bg-white text-black"
        />

        {/* DUE DATE + TIME */}
        <input
          type="datetime-local"
          {...register("dueDate")}
          className="w-full border p-2 rounded bg-white text-black"
        />

        {/* PRIORITY */}
        <select
          {...register("priority")}
          className="w-full border p-2 rounded bg-white text-black"
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
          <option value="URGENT">Urgent</option>
        </select>

        {/* ASSIGN USER */}
        <select
          {...register("assignedToId")}
          className="w-full border p-2 rounded bg-white text-black"
        >
          <option value="">Unassigned</option>
          {users.map((u: any) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>

        {/* ACTIONS */}
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 border rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            {isEdit ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTaskModal;