import * as Dialog from "@radix-ui/react-dialog";
import React from "react";

export const UserProfile = () => {
  // Delete event
  // Edit User Info
  // Edit Event Info

  return (
    <Dialog.Root>
      <Dialog.Trigger className="hover:underline hover:text-white text-gray-400">
        Profile
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/70 fixed inset-0" />
        <Dialog.Content className=" bg-gray-900 p-2 text-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl">
          ashuduasdhsa
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
