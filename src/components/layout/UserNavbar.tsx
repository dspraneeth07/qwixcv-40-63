
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { FileText, Database, Zap } from "lucide-react";

const UserNavbar = () => {
  const location = useLocation();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* CV Tools */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>CV Tools</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    to="/builder"
                  >
                    <FileText className="h-6 w-6" />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Resume Builder
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Create professional resumes with AI assistance
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem to="/linkedin-optimizer" title="LinkedIn Optimizer">
                Enhance your LinkedIn profile with AI suggestions
              </ListItem>
              <ListItem to="/ats-scanner" title="ATS Scanner">
                Optimize your resume for ATS systems
              </ListItem>
              <ListItem to="/resume-compare" title="Resume Compare">
                Compare and analyze multiple resumes
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Career Guide */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Career Guide</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <ListItem
                to="/career-path-simulator"
                title="Career Path Simulator"
              >
                Explore different career paths with AI guidance
              </ListItem>
              <ListItem
                to="/interview-coach"
                title="Interview Coach"
              >
                Practice interviews with AI feedback
              </ListItem>
              <ListItem
                to="/ai-job-switch-planner"
                title="Job Switch Planner"
              >
                Plan your career transitions strategically
              </ListItem>
              <ListItem
                to="/ai-shadow-career-simulator"
                title="Shadow Career Simulator"
              >
                Experience different roles virtually
              </ListItem>
              <ListItem
                to="/skill-gap-analysis"
                title="Skill Gap Analysis"
              >
                Identify and bridge skill gaps
              </ListItem>
              <ListItem
                to="/ai-layoff-readiness-toolkit"
                title="Layoff Readiness Toolkit"
              >
                Prepare for unexpected career changes
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* QwiX Learn */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>QwiX Learn</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <ListItem
                to="/mindprint-assessment"
                title="Mindprint Assessment"
              >
                <div className="flex items-center gap-2">
                  <span>Discover your learning style</span>
                  <Badge variant="secondary" className="text-xs">New</Badge>
                </div>
              </ListItem>
              <ListItem
                to="/ai-coding-coach"
                title="AI Coding Coach"
              >
                Learn programming with personalized AI guidance
              </ListItem>
              <ListItem
                to="/qwixpro-builder"
                title="QwiXPro Builder"
              >
                <div className="flex items-center gap-2">
                  <span>Build professional portfolios</span>
                  <Badge variant="secondary" className="text-xs">Pro</Badge>
                </div>
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* QwixAI - Standalone Menu Item */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              to="/qwix-ai"
              className={cn(
                navigationMenuTriggerStyle(),
                "group inline-flex h-10 w-max items-center justify-center rounded-md bg-gradient-to-r from-orange-50 to-purple-50 px-4 py-2 text-sm font-medium text-orange-700 transition-colors hover:bg-gradient-to-r hover:from-orange-100 hover:to-purple-100 hover:text-orange-800 focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 border border-orange-200"
              )}
            >
              <Zap className="mr-2 h-4 w-4" />
              QwixAI
              <Badge variant="secondary" className="ml-2 text-xs bg-orange-100 text-orange-700">
                New
              </Badge>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Other Links */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              to="/job-board"
              className={navigationMenuTriggerStyle()}
            >
              Job Board
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              to="/blockchain-vault"
              className={`${navigationMenuTriggerStyle()} relative`}
            >
              <Database className="mr-2 h-4 w-4" />
              QwixVault
              <Badge variant="secondary" className="ml-2 text-xs">
                Beta
              </Badge>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { to: string; title: string }
>(({ className, title, children, to, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          to={to}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default UserNavbar;
