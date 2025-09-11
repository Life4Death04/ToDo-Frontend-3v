import { useTheme } from "../hooks/useTheme";
import AppLayout from "../layouts/AppLayout";

export default function AppPage(){
    useTheme();
    return(
        <AppLayout></AppLayout>
    );
}