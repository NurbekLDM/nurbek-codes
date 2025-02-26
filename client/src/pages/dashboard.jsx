    import { verifyToken } from "@/lib/auth";
    import Projects from "@/components/adminPanel/projects";
    import Blog from "@/components/adminPanel/blog";

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
             <div className="container flex flex-row gap-20 mx-auto mt-32">
                <Projects />
                <Blog />
                </div>
        );
    } 