import { NavigationMenu } from "radix-ui";
import { Link } from "react-router";
import Brands from "./brands";
import Collections from "./collection";
import Styles from "./styles";
import Items from "./Items";
import Account from "./account";

const Index = () => {
  return (
    <NavigationMenu.Root className="absolute top-0 left-0 right-0 border-b border-black-900 py-4 bg-white px-5">
      <NavigationMenu.List className="container flex items-center justify-between px-10 ">
        <NavigationMenu.Item>Search</NavigationMenu.Item>
        <div className="flex gap-5 items-center">
          <NavigationMenu.Item>
            <Link
              to="/"
              className="hover:underline transition-all ease-in-out duration-200"
            >
              Home
            </Link>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="hover:underline transition-all ease-in-out duration-200">
              Brands
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="absolute top-5 right-1/2 translate w-[400px] translate-x-1/2 bg-white border border-black-900">
              <Brands />
            </NavigationMenu.Content>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="hover:underline transition-all ease-in-out duration-200">
              Collections
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="absolute top-5 right-1/2 translate w-[600px] translate-x-1/2 bg-white border border-black-900">
              <Collections />
            </NavigationMenu.Content>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="hover:underline transition-all ease-in-out duration-200">
              Styles
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="absolute top-5 right-1/2 translate w-[600px] translate-x-1/2 bg-white border border-black-900">
              <Styles />
            </NavigationMenu.Content>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="hover:underline transition-all ease-in-out duration-200">
              Items
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="absolute top-5 right-1/2 translate w-[600px] translate-x-1/2 bg-white border border-black-900">
              <Items />
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        </div>
        <div>
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="hover:underline transition-all ease-in-out duration-200">
              Account
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="absolute top-5 right-5 translate w-[200px] bg-white border border-black-900">
              <Account />
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        </div>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

export default Index;
