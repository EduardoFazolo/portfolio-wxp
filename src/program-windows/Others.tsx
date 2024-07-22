import { DraggableWindow } from "../components/DraggableWindow";

export const ContactMe = () => {
  return (
    <DraggableWindow
      initialPosition={{ x: 200, y: 200 }}
      title="Contact me"
      processId="contact-me"
    >
      <div className="flex h-full w-full">Contact me</div>
    </DraggableWindow>
  );
};

export const InternetExplorer = () => {
  return (
    <DraggableWindow
      initialPosition={{ x: 300, y: 300 }}
      title="Internet Explorer"
      processId="internet-explorer"
    >
      <div className="flex h-full w-full">Internet Explorer</div>
    </DraggableWindow>
  );
};
