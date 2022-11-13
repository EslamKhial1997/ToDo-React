import { Button } from "react-bootstrap";
import { NavLink, useNavigate, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const navigator = useNavigate();
  const error = useRouteError();
  

  return (
    <div className="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText + error.status || error.message}</i>
      </p>
      <Button
        className="btn btn-info"
        onClick={() => {
          navigator("/", { replace: true });
        }}
      >
        Back Home
      </Button>
    </div>
  );
}
