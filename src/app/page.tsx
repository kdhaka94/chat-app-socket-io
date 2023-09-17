"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "@/components/views/LoginForm/LoginForm";
import { SignUpForm } from "@/components/views/SignUpForm/SignUpForm";
import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if(token){
      router.push("/chat");
    }
  }, [router])
  return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Tabs defaultValue="login" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="create">Create Account</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
          <TabsContent value="create">
            <SignUpForm />
          </TabsContent>
        </Tabs>
      </div>
  );
}
