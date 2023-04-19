
export default function  Footer() {
  return (
    <div className="flex justify-center items-center h-14 border-t">
        <span>Copyright © {new Date().getFullYear()}</span>
    </div>
  );
}