import * as Dialog from "@radix-ui/react-dialog";
import { MarkerF } from "@react-google-maps/api";

const CreateEvent = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>Add event?</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className=" bg-black/60 inset-0 fixed" />
        <Dialog.Content className="bg-gray-900 text-white fixed py-8 px-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg">
          <Dialog.Title className="text-3xl font-black">
            Create your event
          </Dialog.Title>
          <form>
            <div>
              <label htmlFor="hourStart">
                Introduce the duration of the event:
              </label>
              <div>
                <input id="hourStart" type="time" placeholder="Start"></input>
                <input id="hourEnd" type="time" placeholder="End"></input>
              </div>
            </div>
            <footer>
              <button>Cancel</button>
              <button type="submit">Start Busking</button>
            </footer>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
export default CreateEvent;
