import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import api from "../api/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../auth/AuthContext";
import { Toast } from "../lib/toast";

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
      assignedToId: values.assignedToId || null,
      dueDate: new Date(values.dueDate).toISOString(),
    };

    try {
      if (isEdit) {
        await api.patch(`/tasks/${task.id}`, payload);
      } else {
        await api.post("/tasks", payload);
      }

      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

      Toast.success(
        isEdit
          ? "Task updated successfully"
          : "Task created successfully"
      );

      onClose();
    } catch (err) {
      Toast.error("Unable to save task.");
      console.error(err);
    }
  };

  return (
    <div
        className="
          fixed
          inset-0
          z-50
          flex
          items-center
          justify-center
          bg-black/30
          backdrop-blur-sm
          p-6
        "
      >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
                  w-full
                  max-w-lg
                  rounded-3xl
                  border
                  border-slate-200
                  dark:border-slate-700
                  bg-white
                  dark:bg-slate-900
                  shadow-2xl
                  p-7
                  space-y-5
                "
      >
        <h2 className="text-2xl font-bold tracking-tight">
          {isEdit ? "Edit Task" : "Create Task"}
        </h2>

        {/* TITLE */}
        <input
          {...register("title")}
          placeholder="Title"
          className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    dark:border-slate-700
                    bg-slate-50
                    dark:bg-slate-800
                    px-4
                    py-3
                    transition
                    focus:outline-none
                    focus:ring-2
                    focus:ring-primary/20
                    focus:border-primary
                  "
        />

        {/* DESCRIPTION */}
        <textarea
          {...register("description")}
          placeholder="Description"
          className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    dark:border-slate-700
                    bg-slate-50
                    dark:bg-slate-800
                    px-4
                    py-3
                    transition
                    focus:outline-none
                    focus:ring-2
                    focus:ring-primary/20
                    focus:border-primary
                  "
        />

        {/* DUE DATE + TIME */}
        <input
          type="datetime-local"
          {...register("dueDate")}
          className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    dark:border-slate-700
                    bg-slate-50
                    dark:bg-slate-800
                    px-4
                    py-3
                    transition
                    focus:outline-none
                    focus:ring-2
                    focus:ring-primary/20
                    focus:border-primary
                  "
        />

        {/* PRIORITY */}
        <select
          {...register("priority")}
          className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    dark:border-slate-700
                    bg-slate-50
                    dark:bg-slate-800
                    px-4
                    py-3
                    transition
                    focus:outline-none
                    focus:ring-2
                    focus:ring-primary/20
                    focus:border-primary
                  "
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
          <option value="URGENT">Urgent</option>
        </select>

        {/* ASSIGN USER */}
        <select
          {...register("assignedToId")}
          className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    dark:border-slate-700
                    bg-slate-50
                    dark:bg-slate-800
                    px-4
                    py-3
                    transition
                    focus:outline-none
                    focus:ring-2
                    focus:ring-primary/20
                    focus:border-primary
                  "
        >
          <option value="">Unassigned</option>
          {users.map((u: any) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>

        {/* ACTIONS */}
  <div className="flex justify-end gap-3 pt-2">
    <button
      type="button"
      onClick={onClose}
      className="
        h-11
        px-5
        rounded-xl
        border
        border-slate-200
        dark:border-slate-700
        bg-white
        dark:bg-slate-800
        hover:bg-slate-50
        dark:hover:bg-slate-700
        transition
      "
    >
      Cancel
    </button>

    <button
      type="submit"
      className="
        h-11
        px-6
        rounded-xl
        bg-primary
        text-white
        font-medium
        shadow-lg
        hover:brightness-110
        active:scale-95
        transition-all
      "
    >
      {task ? "Save Changes" : "Create Task"}
    </button>
  </div>
      </form>
    </div>
  );
};

export default CreateTaskModal;