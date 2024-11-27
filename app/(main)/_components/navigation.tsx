"use client";
import { cn } from "@/lib/utils";
import { ChevronsLeft, MenuIcon } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { ElementRef, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

function Navigation() {
  const router = useRouter(); /* navigate to a new route */
  const params = useParams(); /* Get the current route parameters */
  const pathName = usePathname(); /* Get the current pathname */
  const isMobile =
    useMediaQuery(
      "(max-width: 768px)"
    ); /* Check if the screen width is 768px... */
  const isResizingRef =
    useRef(false); /* Ref to track if the sidebar is being resized */
  const sideBarRef =
    useRef<ElementRef<"aside">>(null); /* Ref for the sidebar element */
  const navBarRef =
    useRef<ElementRef<"div">>(null); /* Ref for the navigation bar element */
  const [isResetting, setIsResetting] =
    useState(false); /* State to track if the sidebar is reset... */
  const [isCollapsed, setIsCollapsed] =
    useState(isMobile); /* State to track if the sidebar is... */

  const collapse = () => {
    if (sideBarRef.current && navBarRef.current) {
      setIsCollapsed(true); /* Set the sidebar to collapsed */
      setIsResetting(true); /* Set the resetting state to true */
      sideBarRef.current.style.width = "0px"; /* Collapse the sidebar */
      navBarRef.current.style.setProperty(
        "width",
        "100%"
      ); /* Set the navbar width to 100% */
      navBarRef.current.style.setProperty(
        "left",
        "0"
      ); /* Set the navbar position to the start */
      setTimeout(() => {
        setIsResetting(false); /* After animation, set resetting to false */
      }, 300); /* Wait for 300ms */
    }
  };

  const resetWidth = () => {
    if (sideBarRef.current && navBarRef.current) {
      setIsCollapsed(false);
      setIsCollapsed(true);
      sideBarRef.current.style.width = isMobile ? "100%" : "240px";
      navBarRef.current.style.setProperty(
        "width",
        isMobile ? "100%" : "calc(100% - 240px)"
      );
      navBarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");
      setTimeout(() => {
        setIsResetting(false);
      }, 300);
    }
  };

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) {
      return;
    }
    let newWidth = event.clientX;
    if (newWidth < 240) {
      newWidth = 240;
    }
    if (newWidth > 480) {
      newWidth = 480;
    }
    if (sideBarRef.current && navBarRef.current) {
      sideBarRef.current.style.width = `${newWidth}px`;
      navBarRef.current.style.setProperty("left", `${newWidth}px`);
      navBarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`
      );
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <>
      <aside
        ref={sideBarRef}
        className={cn(
          "group/sidebar h-full bg-secondary overflow-y-auto sticky flex w-60 flex-col z-[99999] min-h-[100vh] left-0 top-0",
          isResetting && "transition-all ease-in-out duration-300", // Apply transition during reset...
          isMobile && "w-0" // Set width to 0 if on mobile
        )}
      >
        {/* ChevronsLeft Icon to collapse the sidebar */}
        <div
          onClick={collapse}
          role="button"
          className={cn(
            "absolute top-3 right-2 w-6 h-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 opacity-0 group-hover/sidebar:opacity-100",
            isMobile && "opacity-100" // Always show on mobile
          )}
        >
          <ChevronsLeft className="w-6 h-6" />
        </div>

        {/* Some Actions */}
        <div>Some Actions</div>

        {/* Documents List */}
        <div>Documents List</div>

        {/* Handle for resizing the sidebar */}
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100
        transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
        />
      </aside>

      <div
        ref={navBarRef}
        className={cn(
          "absolute top-0 left-60 z-[99999] w-[calc(100%-240px)]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-full left-0"
        )}
      >
        {/* Icon to open the sidebar when collapsed */}
        <nav className="bg-transparent px-3 py-2 w-full">
          {isCollapsed && (
            <MenuIcon
              onClick={resetWidth}
              role="button"
              className="w-6 h-6 text-muted-foreground"
            />
          )}
        </nav>
      </div>
    </>
  );
}

export default Navigation;
