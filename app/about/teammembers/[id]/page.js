// (about/teammembers/[id]/page.js)
import teamMembers from "../../../../public/images/members";
import Frame from "../../../../components/pages/About/widgets/Frame";
export default function Page({ params }) {
  const person = teamMembers.find((p) => p.id === params.id);

  return (
    <Frame
      imageUrl={person.imageUrl}
      name={person.name}
      description={person.description}
    />
  );
}
