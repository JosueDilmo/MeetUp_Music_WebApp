import * as Dialog from "@radix-ui/react-dialog";
import { MarkerF } from "@react-google-maps/api";

const CreateEvent = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>Add event?</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className=" bg-black/60 inset-0 fixed" />
        <Dialog.Content>
          <Dialog.Title>Add Your Event</Dialog.Title>
          <Dialog.Content>CREATE YOUR EVENT</Dialog.Content>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
export default CreateEvent;
