import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User2Icon, KeyIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../../store/useAuth"; // Importa el store de Zustand
import { useNavigate } from "react-router-dom"; // Para redirigir después de login

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((state) => state.login); // Obtienes la función login del store
  const navigate = useNavigate(); // Para redirigir después del login

  // Lógica de envío del formulario
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      await login(values.user, values.password);

      // Obtiene el usuario actualizado desde el store
      const loggedUser = useAuthStore.getState().user;
      if (!loggedUser) throw new Error("No se pudo obtener el usuario después del login.");

      localStorage.setItem("userLogged", JSON.stringify(loggedUser));
      navigate("/dashboard");

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const formSchema = z.object({
    user: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(2, {
      message: "Password must be at least 2 characters.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" h-full w-full">
        <div className="flex flex-col justify-center gap-4 h-full">
          <div className="w-full flex flex-col justify-center gap-4">
            <FormField
              control={form.control}
              name="user"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="email">Email or User Name</Label>
                  <div className="relative">
                    <Input
                      className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                      {...field}
                      placeholder="Enter your email address or user name"
                    />
                    <User2Icon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                      {...field}
                      placeholder="Enter password"
                      type="password"
                    />
                    <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                  </div>
                </FormItem>
              )}
            />
          </div>
          <section className="flex flex-col gap-2">
            <Button
              type="submit"
              className="w-full text-white"
              disabled={loading}
            >
              Login
            </Button>
            <Button variant="outline" className="w-full" disabled>
              Login with Google
            </Button>
          </section>
        </div>
      </form>
    </Form>
  );
}
