import { DraggableWindow } from "~/components/DraggableWindow";

export const MyDocuments = () => {
  return (
    <DraggableWindow
      initialPosition={{ x: 100, y: 100 }}
      title="My Documents"
      processId="my-documents"
    >
      <div className="flex h-full w-full">My Documents</div>
    </DraggableWindow>
  );
};
