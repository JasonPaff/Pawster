import { BiBell } from "react-icons/bi";

export default function NotificationButton() {
  return (
    <button type="button" className="p-1 rounded-full text-slate-400  hover:text-accent-red hover:bg-transparent hover:border-accent-red focus:outline-none border-transparent">
      <span className="sr-only">View notifications</span>
      <BiBell className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
