import { logout } from "@/lib/actions/auth";

export function LogoutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="rounded-[4px] border border-rule px-3 py-2 text-sm font-medium hover:border-ink"
      >
        Log out
      </button>
    </form>
  );
}
