import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  function handleAnchorClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const newRoute: string | null = event.currentTarget.getAttribute("href");

    if (newRoute) {
      navigate(newRoute);
    }
  }

  return <nav>
    <ul>
      <li><a onClick={handleAnchorClick} href="/">Home</a></li>
      <li><a onClick={handleAnchorClick} href="/contact">Contact</a></li>
    </ul>
  </nav>
}