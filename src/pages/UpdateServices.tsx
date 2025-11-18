import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { updateOzoneServices } from "@/scripts/updateServices";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const UpdateServices = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleUpdate = async () => {
    setLoading(true);
    setResult(null);
    
    try {
      const response = await updateOzoneServices();
      
      if (response.success) {
        setResult({
          success: true,
          message: "Services updated successfully! The services section now displays Ozone Insurance offerings."
        });
        toast({
          title: "Success!",
          description: "Services have been updated with Ozone Insurance offerings.",
        });
      } else {
        setResult({
          success: false,
          message: `Error: ${response.error?.message || 'Unknown error'}`
        });
        toast({
          title: "Error",
          description: "Failed to update services. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      setResult({
        success: false,
        message: `Unexpected error: ${error}`
      });
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <Button
          variant="outline"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <Card className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Update Services
            </h1>
            <p className="text-muted-foreground">
              Click the button below to update the services with Ozone Insurance offerings
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-muted/30 rounded-lg p-6">
              <h3 className="font-semibold mb-3">Services to be added:</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="font-medium text-primary">Personal Insurance:</p>
                  <ul className="list-disc list-inside ml-4 text-muted-foreground">
                    <li>Travel Insurance</li>
                    <li>Home/Auto/Umbrella Insurance</li>
                    <li>Business Auto Insurance</li>
                    <li>Health Insurance</li>
                    <li>Dental Insurance</li>
                    <li>Disability Insurance</li>
                    <li>Vision Insurance</li>
                  </ul>
                </div>
                <div className="mt-3">
                  <p className="font-medium text-primary">Commercial Insurance:</p>
                  <ul className="list-disc list-inside ml-4 text-muted-foreground">
                    <li>Professional Liability</li>
                    <li>Workers Compensation</li>
                    <li>Group Health Insurance</li>
                  </ul>
                </div>
              </div>
            </div>

            <Button
              onClick={handleUpdate}
              disabled={loading}
              className="w-full"
              size="lg"
            >
              {loading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Updating Services...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Update Services Now
                </>
              )}
            </Button>

            {result && (
              <div
                className={`p-4 rounded-lg ${
                  result.success
                    ? "bg-success/10 border border-success/20 text-success"
                    : "bg-destructive/10 border border-destructive/20 text-destructive"
                }`}
              >
                <p className="font-medium">{result.message}</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UpdateServices;
