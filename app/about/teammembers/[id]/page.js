// (about/teammembers/[id]/page.js)
import teamMembers from "../../../../public/images/members";
import Frame from "../../../../components/pages/About/widgets/Frame";
export default function Page({ id }) {
  const person = teamMembers.find((person) => person.id === id);
  if (!person) {
    return <div>Loading...</div>;
  }

  return (
    <Frame
      imageUrl={person.imageUrl}
      name={person.name}
      description={person.description}
    />
  );
}
