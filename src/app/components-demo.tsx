import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/card"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../components/ui/dialog"
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "../components/ui/navigation-menu"

export default function ComponentsDemo() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Components Demo</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Button</h2>
        <Button>Click me</Button>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Input</h2>
        <Input placeholder="Type something..." />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Card</h2>
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Dialog</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dialog Title</DialogTitle>
              <DialogDescription>
                This is a dialog description.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Navigation Menu</h2>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink href="/">Home</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/about">About</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/contact">Contact</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </section>
    </div>
  )
}
