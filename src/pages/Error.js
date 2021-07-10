import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Button } from "semantic-ui-react";

function Error() {
  return (
    <div className="error-page">
      <h1> Page Not Found</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat minus
        excepturi veritatis. Laudantium nemo voluptatibus provident facilis
        ratione commodi ipsum, quaerat quidem, voluptates nulla necessitatibus
        reprehenderit, perspiciatis labore dignissimos aspernatur rerum. Et
        aspernatur ullam recusandae officiis facilis veritatis animi inventore
        ex, dignissimos rem perspiciatis repellendus assumenda, maiores harum
        vero sed!
      </p>
      <Link to="/">
        <Button className="form-btn" color="purple" size="large">
          Return Home
        </Button>
      </Link>
    </div>
  );
}

export default Error;
