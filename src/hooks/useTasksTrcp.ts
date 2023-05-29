import { useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "~/utils/api";

export const useTasksTrcp = () => {
  const trpcUtils = api.useContext();

  const { data: session, status } = useSession();

  const [mainTaskTitle, setMainTaskTitle] = useState("");

  const [updMainTaskTitle, setUpdMainTaskTitle] = useState("");

  const [mainTaskDescription, setMainTaskDescription] = useState("");

  const [updMainTaskDescription, setUpdMainTaskDescription] = useState("");

  const [mainSubTaskTitle, setMainSubTaskTitle] = useState("");

  const [mainSubTaskDescription, setMainSubTaskDescription] = useState("");

  const [updMainSubTaskTitle, setUpdMainSubTaskTitle] = useState("");

  const [updMainSubTaskDesc, setUpdMainSubTaskDesc] = useState("");

  const [onClicked, setOnClicked] = useState(false);

  const [onEdit, setOnEdit] = useState(true);

  const [addedUsers, setAddedUsers] = useState([]);

  const createTask = api.task.create.useMutation({
    onSuccess: () => {
      setOnClicked(false);
      setMainTaskTitle("");
      setMainTaskDescription("");
      if (status !== "authenticated") return;

      trpcUtils.task.infiniteFeed.setInfiniteData({}, (oldData) => {
        if (oldData == null) return;

        trpcUtils.task.invalidate();
        return {
          ...oldData,
        };
      });
    },
  });

  function handleCreate() {
    createTask.mutate({
      content: {
        mainTaskTitle,
        mainTaskDescription,
      },
      user_id: session?.user.id as any,
    });
  }

  const updateTask = api.task.update.useMutation({
    onSuccess: () => {
      setOnEdit(false);
      setUpdMainTaskTitle("");
      setUpdMainTaskDescription("");
      if (status !== "authenticated") return;

      trpcUtils.task.infiniteFeed.setInfiniteData({}, (oldData) => {
        if (oldData == null) return;

        trpcUtils.task.invalidate();
        return {
          ...oldData,
        };
      });
    },
  });

  function handleUpdate(id: any) {
    updateTask.mutate({
      content: {
        updMainTaskTitle,
        updMainTaskDescription,
      },
      user_id: session?.user.id as any,
      taskId: id,
    });
  }

  const createSubTask = api.task.createSubTask.useMutation({
    onSuccess: () => {
      setOnClicked(false);
      setMainSubTaskTitle("");
      setMainSubTaskDescription("");
      if (status !== "authenticated") return;

      trpcUtils.task.infiniteFeed.setInfiniteData({}, (oldData) => {
        if (oldData == null) return;

        trpcUtils.task.invalidate();
        return {
          ...oldData,
        };
      });
    },
  });

  function handleSubtaskCreate(id: number) {
    createSubTask.mutate({
      content: {
        mainSubTaskTitle,
        mainSubTaskDescription,
      },
      user_id: session?.user.id as any,
      taskId: id,
    });
  }

  const updateSubTask = api.task.updateSubtask.useMutation({
    onSuccess: () => {
      setOnEdit(false);
      setUpdMainSubTaskTitle("");
      setUpdMainSubTaskDesc("");
      if (status !== "authenticated") return;

      trpcUtils.task.infiniteFeed.setInfiniteData({}, (oldData) => {
        if (oldData == null) return;

        trpcUtils.task.invalidate();

        return {
          ...oldData,
        };
      });
    },
  });

  function handleSubtaskUpdate(id: any) {
    updateSubTask.mutate({
      content: {
        updMainSubTaskTitle,
        updMainSubTaskDesc,
      },
      user_id: session?.user.id as any,
      taskId: id,
    });
  }

  const getAllusers = api.users.getAllUsers.useInfiniteQuery({});
  const parsedUsers = getAllusers?.data?.pages.flatMap((user) => user?.users);

  const addUsers = api.task.addUsers.useMutation({
    onSuccess: () => {
      setOnEdit(false);
      setUpdMainSubTaskTitle("");
      setUpdMainSubTaskDesc("");
      if (status !== "authenticated") return;

      trpcUtils.task.infiniteFeed.setInfiniteData({}, (oldData) => {
        if (oldData == null) return;

        trpcUtils.task.invalidate();

        return {
          ...oldData,
        };
      });
    },
  });

  function handleAddUsers(id: any, userIds: any[]) {
    addUsers.mutate({
      content: {
        mainTaskTitle,
        mainTaskDescription,
      },
      user_id: session?.user.id as any,
      taskId: id,
      usersId: addedUsers,
    });
  }
  return {
    createTask,
    handleCreate,
    updateTask,
    handleUpdate,
    createSubTask,
    handleSubtaskCreate,
    updateSubTask,
    handleSubtaskUpdate,
    setUpdMainTaskTitle,
    setUpdMainTaskDescription,
    updMainTaskTitle,
    updMainTaskDescription,
    mainSubTaskTitle,
    mainSubTaskDescription,
    updMainSubTaskTitle,
    updMainSubTaskDesc,
    setMainSubTaskTitle,
    setMainSubTaskDescription,
    setUpdMainSubTaskTitle,
    setUpdMainSubTaskDesc,
    onClicked,
    onEdit,
    setOnEdit,
    setMainTaskTitle,
    mainTaskTitle,
    setMainTaskDescription,
    mainTaskDescription,
    setOnClicked,
    handleAddUsers,
    parsedUsers,
  };
};
