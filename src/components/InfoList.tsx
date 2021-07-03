import {
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";

interface InfoListProps {
  header?: string;
  mapping: {
    key: string;
    label: string;
    value: string;
    link: string;
  }[];
}
export default function InfoList({ mapping, header }: InfoListProps) {
  return (
    <List
      subheader={
        header ? (
          <ListSubheader>
            <h3>{header}</h3>
          </ListSubheader>
        ) : (
          <> </>
        )
      }
      dense
    >
      {mapping.map((item) => (
        <ListItem key={item.key}>
          <ListItemText
            id="switch-list-label-wifi"
            style={{ wordWrap: "break-word" }}
            primary={item.label}
            secondary={item.value}
          />
          {item.link && (
            <ListItemSecondaryAction>
              <IconButton onClick={() => window.open(item.link)}>
                <OpenInNewIcon />
              </IconButton>
            </ListItemSecondaryAction>
          )}
        </ListItem>
      ))}
    </List>
  );
}
