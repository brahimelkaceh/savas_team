import Form from "../../components/Form";
function BatimentForms({ data }) {
  console.log(data);
  return (
    <div>
      <Form data={data} />
    </div>
  );
}

export default BatimentForms;
