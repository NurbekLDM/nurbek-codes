    import { verifyToken } from "@/lib/auth";
    import Projects from "@/components/adminPanel/projects";

    export const getServerSideProps = async (context) => {
      console.log("Cookies:", context.req.cookies);
        const token = context.req.cookies?.accessToken;
      
        const verifiedToken = verifyToken(token);


        if (!verifiedToken) {
            return {
                redirect: {
                    destination: "/login",
                    statusCode: 302,
                },
            };
        }

        return {
            props: {},
        };
    };

    export default function Dashboard() {
        return (
             <div className="container mx-auto mt-32">
              
                <Projects />
                </div>
        );
    } 