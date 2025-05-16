import { UserSetting, SettingsUpdateData } from "@/hooks/use-user-settings";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useTheme } from "@/lib/theme-provider";

// Form schema with validation
const settingsFormSchema = z.object({
  emailNotifications: z.boolean().default(true),
  smsNotifications: z.boolean().default(false),
  appNotifications: z.boolean().default(true),
  marketingEmails: z.boolean().default(true),
  orderUpdates: z.boolean().default(true),
  promotionAlerts: z.boolean().default(true),
  theme: z.enum(["light", "dark", "system"]).default("system"),
  language: z.string().default("en"),
});

type SettingsFormValues = z.infer<typeof settingsFormSchema>;

interface SettingsFormProps {
  settings: UserSetting | undefined;
  onSubmit: (data: SettingsUpdateData) => void;
  isSubmitting: boolean;
}

export function SettingsForm({
  settings,
  onSubmit,
  isSubmitting,
}: SettingsFormProps) {
  const { theme: currentTheme, setTheme } = useTheme();
  
  // Default form values from settings or fallbacks
  const defaultValues: SettingsFormValues = {
    emailNotifications: settings?.emailNotifications ?? true,
    smsNotifications: settings?.smsNotifications ?? false,
    appNotifications: settings?.appNotifications ?? true,
    marketingEmails: settings?.marketingEmails ?? true,
    orderUpdates: settings?.orderUpdates ?? true,
    promotionAlerts: settings?.promotionAlerts ?? true,
    theme: settings?.theme ?? currentTheme as "light" | "dark" | "system",
    language: settings?.language ?? "en",
  };

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Notification Preferences</h3>
            <p className="text-sm text-gray-500">
              Manage how you want to receive notifications
            </p>
          </div>
          
          <FormField
            control={form.control}
            name="emailNotifications"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Email Notifications</FormLabel>
                  <FormDescription>
                    Receive notifications via email
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="smsNotifications"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">SMS Notifications</FormLabel>
                  <FormDescription>
                    Receive notifications via text message
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="appNotifications"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">In-App Notifications</FormLabel>
                  <FormDescription>
                    Receive notifications within the application
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="pt-4">
            <h3 className="text-lg font-medium">Communication Preferences</h3>
            <p className="text-sm text-gray-500 mt-1">
              Control what types of communications you receive
            </p>
          </div>
          
          <FormField
            control={form.control}
            name="marketingEmails"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Marketing Emails</FormLabel>
                  <FormDescription>
                    Receive emails about new products, sales, and promotions
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="orderUpdates"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Order Updates</FormLabel>
                  <FormDescription>
                    Receive updates about your orders and shipping status
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="promotionAlerts"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Promotion Alerts</FormLabel>
                  <FormDescription>
                    Receive alerts about sales, discounts, and special offers
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="pt-4">
            <h3 className="text-lg font-medium">Display Settings</h3>
            <p className="text-sm text-gray-500 mt-1">
              Customize your browsing experience
            </p>
          </div>
          
          <FormField
            control={form.control}
            name="theme"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Theme</FormLabel>
                <Select
                  onValueChange={(value) => {
                    // Update form field
                    field.onChange(value);
                    // Apply theme immediately
                    setTheme(value as "light" | "dark" | "system");
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Choose your preferred color theme
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Language</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Choose your preferred language
                </FormDescription>
              </FormItem>
            )}
          />
        </div>

        <Button 
          type="submit" 
          className="bg-[#D4AF37] hover:bg-[#C09C1F] text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save Settings"}
        </Button>
      </form>
    </Form>
  );
}