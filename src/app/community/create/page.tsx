import CategoryImagePicker from './_components/category-image-picker';
import BoardCreationForm from './_components/board-creation-form';

export default function CommunityCreatePage() {
  return (
    <main className="flex flex-col w-full max-w-screen-sm">
      <CategoryImagePicker />
      <BoardCreationForm />
    </main>
  );
}
