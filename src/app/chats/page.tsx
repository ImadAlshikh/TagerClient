"use client";

import { useUserStore } from "@/stores/useUserStore";
import axios from "axios";
import { useEffect } from "react";

export default function page() {
  const { user } = useUserStore();
  useEffect(() => {
    (async () => {
      if (!user) return;
      const res = await axios.get(
        `http://localhost:3001/chats/by-user/${user.id}`,
        { withCredentials: true }
      );
      console.log(res);
    })();
  }, [user]);
  return <div>page</div>;
}
