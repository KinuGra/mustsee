"use client";

import {
  Button,
  Group,
  MantineProvider,
  defaultVariantColorsResolver,
  VariantColorsResolver,
  parseThemeColor,
  rgba,
  darken,
} from "@mantine/core";
import { auth } from "@/lib/FirebaseConfig";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ChatPage = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebaseからログアウト
    } catch (error) {
      console.log("ログアウトに失敗しました。");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (!user) {
        router.push("/login");
      } else {
        console.log("ログイン中:", user);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth, router]);
  return (
    <>
      <h1>チャット画面</h1>
      <Demo onClick={handleLogout} />
    </>
  );
};

const variantColorResolver: VariantColorsResolver = (input) => {
  const defaultResolvedColors = defaultVariantColorsResolver(input);
  const parsedColor = parseThemeColor({
    color: input.color || input.theme.primaryColor,
    theme: input.theme,
  });

  // Override some properties for variant
  if (
    parsedColor.isThemeColor &&
    parsedColor.color === "lime" &&
    input.variant === "filled"
  ) {
    return {
      ...defaultResolvedColors,
      color: "var(--mantine-color-black)",
      hoverColor: "var(--mantine-color-black)",
    };
  }

  // Completely override variant
  if (input.variant === "light") {
    return {
      background: rgba(parsedColor.value, 0.1),
      hover: rgba(parsedColor.value, 0.15),
      border: `1px solid ${parsedColor.value}`,
      color: darken(parsedColor.value, 0.1),
    };
  }

  // Add new variants support
  if (input.variant === "danger") {
    return {
      background: "var(--mantine-color-red-9)",
      hover: "var(--mantine-color-red-8)",
      color: "var(--mantine-color-white)",
      border: "none",
    };
  }

  return defaultResolvedColors;
};

function Demo({ onClick }: { onClick?: () => void }) {
  return (
    <MantineProvider theme={{ variantColorResolver }}>
      <Group>
        {/* <Button color="lime.4" variant="filled"> */}
        {/*   Lime filled button */}
        {/* </Button> */}

        <Button color="orange" variant="light" onClick={onClick}>
          ログアウト
        </Button>

        {/* <Button variant="danger">Danger button</Button> */}
      </Group>
    </MantineProvider>
  );
}

export default ChatPage;
