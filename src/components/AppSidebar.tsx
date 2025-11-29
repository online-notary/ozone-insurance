import { useState } from "react";
import { 
  Home, 
  FileText, 
  Briefcase, 
  FolderOpen, 
  MessageSquare, 
  ShoppingBag, 
  Mail,
  Phone,
  Clock,
  Facebook,
  Twitter,
  MessageCircle,
  Send
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const menuItems = [
  { title: "Home", url: "#home", icon: Home },
  { title: "Pages", url: "#pages", icon: FileText },
  { title: "Services", url: "#services", icon: Briefcase },
  { title: "Portfolio", url: "#portfolio", icon: FolderOpen },
  { title: "Blog", url: "#blog", icon: MessageSquare },
  { title: "Shop", url: "#shop", icon: ShoppingBag },
  { title: "Contact", url: "#contact", icon: Mail },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: MessageCircle, href: "#", label: "WhatsApp" },
  { icon: Send, href: "#", label: "Telegram" },
];

export function AppSidebar() {
  return (
    <Sidebar side="right" className="w-80 border-l border-gray-200 bg-white">
      <SidebarHeader className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center relative">
            <span className="text-white font-bold text-lg">V</span>
            <div className="absolute -right-1 -top-1 w-3 h-3 bg-blue-400 rounded-sm transform rotate-45"></div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Vankine</h2>
            <p className="text-sm text-slate-500">Insurance Solutions</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-semibold text-slate-600 mb-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="w-full justify-start">
                    <a 
                      href={item.url}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group"
                    >
                      <item.icon className="h-5 w-5 text-slate-600 group-hover:text-blue-600" />
                      <span className="font-medium text-slate-700 group-hover:text-blue-600">
                        {item.title}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="my-6" />

        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-semibold text-slate-600 mb-4">
            Contact Info
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="h-4 w-4 text-blue-600" />
                <span className="text-slate-700">1-833-MY-OZONE</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Clock className="h-4 w-4 text-blue-600" />
                <span className="text-slate-700">Sun-monday, 09am-5pm</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="h-4 w-4 text-blue-600" />
                <span className="text-slate-700">info@vankine.com</span>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="my-6" />

        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-semibold text-slate-600 mb-4">
            Follow Us
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="flex items-center space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="p-2 rounded-lg bg-slate-100 hover:bg-blue-100 transition-colors group"
                  title={social.label}
                >
                  <social.icon className="h-4 w-4 text-slate-600 group-hover:text-blue-600" />
                </a>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-6 border-t border-gray-100">
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium">
          Get A Quote
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}