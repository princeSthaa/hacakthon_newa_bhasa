import { Link } from "react-router";

export default function Navbar() {
  return (
    <div className="flex justify-end gap-2 p-4 w-full">
        <Link className="border p-1" to="/signin">Sign in</Link>
        <Link className="border p-1" to="/signup">Sign up</Link>
    </div>
  )
}
