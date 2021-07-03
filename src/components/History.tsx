import { List, ListSubheader, ListItem, ListItemText } from "@material-ui/core";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { HistoryContext } from "../providers/HistoryProvider";

export default function History() {
  const { history, appendItem } = useContext(HistoryContext);
  const navigate = useNavigate();

  return (
    <List
      dense
      subheader={
        <ListSubheader>
          <h3> History </h3>
        </ListSubheader>
      }
    >
      {history.map((item) => {
        const tokens = item.split("/");
        return (
          <ListItem
            button
            key={item}
            onClick={() => {
              appendItem(window.location.href);
              navigate(
                `/${tokens[tokens.length - 2]}/${tokens[tokens.length - 1]}`
              );
            }}
          >
            <ListItemText
              id="switch-list-label-wifi"
              style={{ wordWrap: "break-word" }}
              primary={item.includes("address") ? "Address" : "Transaction"}
              secondary={item.split("/").reverse()[0]}
            />
          </ListItem>
        );
      })}
    </List>
  );
}
