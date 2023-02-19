import { writable, derived } from "svelte/store";

export const isAuthenticated = writable(false);
export const user = writable<any>({});
export const popupOpen = writable(false);
export const error = writable();

export const tasks = writable<any[]>([]);

export const user_tasks = derived<
    [typeof tasks, typeof user],
    ReturnType<any>
>([tasks, user], ([$tasks, $user]) => {
    let logged_in_user_tasks: any = [];

    if ($user && $user.email) {
        logged_in_user_tasks = $tasks.filter((task) => task.user === $user.email);
    }

    return logged_in_user_tasks;
});