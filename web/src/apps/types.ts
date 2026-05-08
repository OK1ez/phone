import type { Component } from "svelte";

export type AppComponent = Component<any>;

export interface AppDefinition {
  id: string;
  label: string;
  icon?: string;
  component: AppComponent;
}

export interface AppRouteDefinition {
  label: string;
  component: AppComponent;
}

export type NavigationDirection = "forward" | "back";
