import Card from "@mui/material/Card";

function Home() {
  return (
    <Card
      sx={{
        display: "flex",
        margin: "15px auto",
        justifyItems: "center",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        width: "34vw",
        height: "33vw",
      }}
    >
      Hola Header
    </Card>
  );
}

export default Home;
