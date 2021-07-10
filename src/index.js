import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import ApolloProvider from "./ApolloServer";

ReactDOM.render(ApolloProvider, document.getElementById("root"));

serviceWorker.unregister();
