import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "../api/tasks";
import { Task } from "../types/task";

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,

    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const previous =
        queryClient.getQueryData<Task[]>(["tasks"]);

      queryClient.setQueryData<Task[]>(
        ["tasks"],
        (old) => old?.filter((t) => t.id !== id) ?? []
      );

      return { previous };
    },

    onError: (_err, _id, ctx) => {
      if (ctx?.previous) {
        queryClient.setQueryData(["tasks"], ctx.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });
}