import React, { Fragment, useState } from "react";
import intl from "react-intl-universal";
import {
  Button,
  Drawer,
  Hidden,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
  useTheme,
} from "@mui/material";
import BusinessCenter from "@mui/icons-material/BusinessCenter";
import SportsEsports from "@mui/icons-material/SportsEsports";
import Groups from "@mui/icons-material/Groups";
import Forum from "@mui/icons-material/Forum";
import AccessAlarms from "@mui/icons-material/AccessAlarms";
import MonitorHeart from "@mui/icons-material/MonitorHeart";
import LocalLibrary from "@mui/icons-material/LocalLibrary";
import Tv from "@mui/icons-material/Tv";
import AssuredWorkload from "@mui/icons-material/AssuredWorkload";
import Domain from "@mui/icons-material/Domain";
import CategoryIcon from "@mui/icons-material/Category";
import Check from "@mui/icons-material/Check";
import ClearAll from "@mui/icons-material/ClearAll";
import { Category } from "../../model/Category";

export interface FiltersProps {
  categories: Category[];
  selected: Category | null;
  validatedOnly: boolean;
  onCategorySelect: (category: Category | null) => void;
  onSubcategorySelect: (subcategory: string) => void;
  onValidatedOnlyChange?: (validatedOnly: boolean) => void;
}

const getCategoryIcon = (category: string): React.ReactElement => {
  switch (category) {
    case "Finance":
      return <BusinessCenter />;
    case "Gaming":
      return <SportsEsports />;
    case "Social media":
      return <Groups />;
    case "Communication":
      return <Forum />;
    case "Productivity":
      return <AccessAlarms />;
    case "Health":
      return <MonitorHeart />;
    case "Education":
      return <LocalLibrary />;
    case "Entertainment":
      return <Tv />;
    case "Governance":
      return <AssuredWorkload />;
    case "Infrastructure":
      return <Domain />;
    default:
      return <CategoryIcon />;
  }
};

const Filter = ({
  name,
  selected,
  icon,
  onSelect,
}: {
  name: string;
  selected: boolean;
  icon: React.ReactElement;
  onSelect: () => void;
}) => (
  <ListItemButton onClick={onSelect}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText
      primary={
        <Typography
          variant="body2"
          style={{ fontWeight: selected ? "bold" : "normal" }}
        >
          {name}
        </Typography>
      }
    />
  </ListItemButton>
);

const SubFilter = ({
  subcategories,
  selected,
  onSelect,
}: {
  subcategories: string[];
  selected: string[];
  onSelect: (subcategory: string) => void;
}) => (
  <List component="div" disablePadding>
    {subcategories.map((subcategory) => (
      <ListItemButton
        key={subcategory}
        sx={{ pl: 4 }}
        onClick={() => onSelect(subcategory)}
      >
        <ListItemText
          primary={subcategory}
          primaryTypographyProps={{
            sx: {
              fontSize: "14px",
              fontWeight: selected.includes(subcategory) ? "bold" : "normal",
            },
          }}
        />
      </ListItemButton>
    ))}
  </List>
);

const FilterList = ({
  categories,
  selected,
  validatedOnly,
  onCategorySelect,
  onSubcategorySelect,
  onValidatedOnlyChange,
}: FiltersProps) => {
  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          {intl.get("CATEGORIES")}
        </ListSubheader>
      }
    >
      <Filter
        name="All"
        selected={!selected}
        icon={<ClearAll />}
        onSelect={() => onCategorySelect(null)}
      />
      {categories.map((category) => (
        <Fragment key={category.name}>
          <Filter
            name={category.name}
            selected={category.name === selected?.name}
            icon={getCategoryIcon(category.name)}
            onSelect={() => onCategorySelect(category)}
          />
          {category.name === selected?.name && (
            <SubFilter
              subcategories={category.subcategories}
              selected={selected.subcategories}
              onSelect={onSubcategorySelect}
            />
          )}
        </Fragment>
      ))}
      {Boolean(onValidatedOnlyChange) && (
        <ListItemButton
          onClick={() => (onValidatedOnlyChange as Function)(!validatedOnly)}
        >
          <ListItemText
            primary={intl.get(
              validatedOnly ? "SHOW_ALL" : "SHOW_VALIDATED_ONLY"
            )}
          />
        </ListItemButton>
      )}
    </List>
  );
};

const Filters = (props: FiltersProps) => {
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Hidden smDown>
        <FilterList {...props} />
      </Hidden>
      <Hidden smUp>
        <Button
          onClick={() => setOpen(true)}
          color="secondary"
          sx={{ fontWeight: "bold", mb: "20px" }}
        >
          {intl.get("CATEGORIES")}
        </Button>
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          sx={{ height: "100%", backgroundColor: theme.palette.primary.dark }}
        >
          <FilterList {...props} />
        </Drawer>
      </Hidden>
    </>
  );
};

export default Filters;
